export const apiConfig = {
      glhf: {
        baseUrl: "https://glhf.chat/api/openai/v1",
        apiKey: process.env.API_KEY_GLHF,
      },
      openai: {
        baseUrl: "https://api.openai.com/v1",
        apiKey: process.env.API_KEY_OPENAI,
      },
      anthropic: {
        baseUrl: "https://api.anthropic.com/v1",
        apiKey: process.env.API_KEY_ANTHROPIC,
      },
      groq: {
        baseUrl: "https://api.groq.com/v1",
        apiKey: process.env.API_KEY_GROQ,
      },
      perplexity: {
        baseUrl: "https://api.perplexity.ai/v1",
        apiKey: process.env.API_KEY_PERPLEXITY,
      },
      google: {
        baseUrl: "https://generativelanguage.googleapis.com/v1beta",
        apiKey: process.env.API_KEY_GOOGLE,
      },
      mistral: {
        baseUrl: "https://api.mistral.ai/v1",
        apiKey: process.env.API_KEY_MISTRAL,
      },
      openrouter: {
        baseUrl: "https://openrouter.ai/api/v1",
        apiKey: process.env.API_KEY_OPENROUTER,
      },
      sambanova: {
        baseUrl: "https://fast-api.snova.ai/v1",
        apiKey: process.env.API_KEY_SAMBANOVA,
      },
      codestral: {
        baseUrl: "https://api.codestral.ai/v1",
        apiKey: process.env.API_KEY_CODESTRAL,
      },
      openai_azure: {
        baseUrl: process.env.OPENAI_AZURE_ENDPOINT,
        apiKey: process.env.API_KEY_OPENAI_AZURE,
        apiVersion: process.env.OPENAI_API_VERSION,
      },
      ollama: {
        baseUrl: process.env.OLLAMA_BASE_URL,
      },
      lmstudio: {
        baseUrl: process.env.LM_STUDIO_BASE_URL,
      },
    };
