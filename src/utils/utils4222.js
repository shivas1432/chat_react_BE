// Utils 4222 - chat_react_BE
class Utils4222 {
  static formatDate(date) {
    return new Date(date).toISOString();
  }

  static generateId() {
    return Date.now().toString(36) + Math.random().toString(36);
  }

  static validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  static sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    return input.trim().replace(/[<>]/g, '');
  }

  static async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = Utils4222;
