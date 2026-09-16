const API_BASE = '/api';

export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || `Request failed with status ${response.status}`);
  }
  return data;
}

export const novaApi = {
  // Generate names
  async generateNames(params) {
    return await apiRequest('/generate', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  },

  // Remix a name
  async remixName(candidate, direction, customInstruction) {
    return await apiRequest('/remix', {
      method: 'POST',
      body: JSON.stringify({ candidate, direction, customInstruction }),
    });
  },

  // Live Name DNA analysis
  async analyzeIdea(params) {
    return await apiRequest('/analyze', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  },

  // Surprise Me leap
  async surpriseMe(idea, industry) {
    return await apiRequest('/surprise', {
      method: 'POST',
      body: JSON.stringify({ idea, industry }),
    });
  },

  // Copilot conversational assistance
  async copilotChat(query, currentSession, currentCandidates) {
    return await apiRequest('/copilot', {
      method: 'POST',
      body: JSON.stringify({ query, currentSession, currentCandidates }),
    });
  },

  // Fetch sample sessions
  async getSampleSessions() {
    return await apiRequest('/sample-sessions');
  },

  // Health check
  async checkHealth() {
    return await apiRequest('/health');
  },
};
