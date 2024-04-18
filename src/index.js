const TurndownService = require('turndown'); // Assuming Turndown is loaded

function run() {
  // Get user input using Host.inputString()
  const input = Host.inputString();

  // Check if input is a URL
  if (input.startsWith('http')) {
    try {
      // Fetch content using Http.request
      const request = {
        method: "GET",
        url: input,
      };
      const response = Http.request(request);
      if (response.status !== 200) {
        throw new Error(`Got non 200 response ${response.status}`);
      }

      // Parse HTML with Turndown
      const turndown = new TurndownService();
      const markdown = turndown.turndown(response.body);

      // Extract content from specific tags (modify as needed)
      const texts = [];
      markdown.querySelectorAll('article').forEach((tag) => {
        texts.push(...tag.querySelectorAll(text => text.textContent));
        tag.remove();
      });
      markdown.querySelectorAll('p').forEach((tag) => {
        texts.push(...tag.querySelectorAll(text => text.textContent));
        tag.remove();
      });

      // Output the extracted content as markdown
      Host.outputString(texts.join('\n\n'));
    } catch (error) {
      Host.outputString(`Error fetching or parsing content: ${error.message}`);
    }
  } else {
    // Plain text input, output directly
    Host.outputString(input);
  }
}

module.exports = { run };