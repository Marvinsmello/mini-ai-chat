# Mini AI Chat

My CS 121 capstone project. A small web application where users can type questions and receive AI-generated responses through OpenRouter.

Built using HTML, CSS, and JavaScript only. No login and no backend.

## Setup

1. Get a free API key from [OpenRouter](https://openrouter.ai/).
2. Open the [Mini AI Chat application](https://mini-ai-chat-emmanuel.netlify.app/) (or open `index.html` in a browser).
3. Paste the API key into the input field and click **Save**.
4. Type a question and click **Send**.
5. The assistant's response will appear in the conversation area.

## Model

`openrouter/free`

## localStorage usage

The API key is saved in localStorage under the name `openrouter_api_key`.

- **Save:** Stores the key in localStorage and in the JavaScript variable.
- **Load:** Restores the saved key when the application is reopened.
- **Forget key:** Removes the key from localStorage and from the variable in memory, and clears the input field.

The API key is never hardcoded into the source code or published on GitHub.

## Completed bonuses

None yet.

## Known limitations

- Every question is treated independently. Previous questions are not sent as context to the AI.
- Messages disappear when the page is refreshed.
- The application does not save conversation history.
- Free models have usage limits and may occasionally be unavailable.
- An internet connection is required to communicate with OpenRouter.

## Checks performed

- Successfully saved and restored the API key.
- Confirmed that the API key is masked in the password input.
- Successfully sent questions and received real AI responses.
- Confirmed that user messages and assistant responses are displayed separately.
- Tested blank question validation.
- Tested missing and invalid API key handling.
- Tested network failure handling.
- Tested loading status and prevention of repeated Send clicks.
- Confirmed API key persistence after refreshing the page.
- Tested the Forget key functionality.
- Checked the application on desktop and mobile layouts.

## AI usage statement

ChatGPT was used as a development assistant to help understand JavaScript concepts, review code, troubleshoot errors, and improve the project.

AI-generated suggestions were reviewed, modified where necessary, and tested manually in the browser.
