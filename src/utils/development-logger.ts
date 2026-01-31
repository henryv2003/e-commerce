import fs from 'fs';
import path from 'path';

interface LogEntry {
  timestamp: string;
  sessionId: string;
  type: 'question' | 'answer' | 'code_change' | 'file_creation' | 'file_edit' | 'deployment' | 'bug_fix';
  content: string;
  details?: any;
}

class DevelopmentLogger {
  private logFile: string;
  private sessionId: string;

  constructor() {
    this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.logFile = path.join(process.cwd(), 'development_log.json');
    
    // Initialize log file if it doesn't exist
    if (!fs.existsSync(this.logFile)) {
      fs.writeFileSync(this.logFile, JSON.stringify({ logs: [] }, null, 2));
    }
  }

  private addLog(entry: Omit<LogEntry, 'timestamp' | 'sessionId'>): void {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      ...entry
    };

    try {
      const data = JSON.parse(fs.readFileSync(this.logFile, 'utf8'));
      data.logs.push(logEntry);
      
      // Keep only last 100 entries to prevent file from getting too large
      if (data.logs.length > 100) {
        data.logs = data.logs.slice(-100);
      }
      
      fs.writeFileSync(this.logFile, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error writing to development log:', error);
    }
  }

  logQuestion(question: string): void {
    this.addLog({
      type: 'question',
      content: question
    });
  }

  logAnswer(answer: string): void {
    this.addLog({
      type: 'answer',
      content: answer
    });
  }

  logCodeChange(file: string, description: string): void {
    this.addLog({
      type: 'code_change',
      content: `Modified ${file}: ${description}`,
      details: { file, description }
    });
  }

  logFileCreation(file: string, purpose: string): void {
    this.addLog({
      type: 'file_creation',
      content: `Created ${file}: ${purpose}`,
      details: { file, purpose }
    });
  }

  logFileEdit(file: string, change: string): void {
    this.addLog({
      type: 'file_edit',
      content: `Edited ${file}: ${change}`,
      details: { file, change }
    });
  }

  logBugFix(issue: string, solution: string): void {
    this.addLog({
      type: 'bug_fix',
      content: `Fixed: ${issue} -> ${solution}`,
      details: { issue, solution }
    });
  }

  logDeployment(status: string, details?: string): void {
    this.addLog({
      type: 'deployment',
      content: `Deployment ${status}${details ? `: ${details}` : ''}`,
      details: { status, details }
    });
  }

  getRecentLogs(count: number = 20): LogEntry[] {
    try {
      const data = JSON.parse(fs.readFileSync(this.logFile, 'utf8'));
      return data.logs.slice(-count).reverse();
    } catch (error) {
      console.error('Error reading development log:', error);
      return [];
    }
  }

  getSessionLogs(): LogEntry[] {
    try {
      const data = JSON.parse(fs.readFileSync(this.logFile, 'utf8'));
      return data.logs.filter((log: LogEntry) => log.sessionId === this.sessionId);
    } catch (error) {
      console.error('Error reading development log:', error);
      return [];
    }
  }

  exportSessionSummary(): string {
    const sessionLogs = this.getSessionLogs();
    if (sessionLogs.length === 0) {
      return 'No logs found for current session.';
    }

    let summary = `\n📋 Development Session Summary - ${new Date().toLocaleString()}\n`;
    summary += `${'='.repeat(60)}\n\n`;

    sessionLogs.forEach((log, index) => {
      const time = new Date(log.timestamp).toLocaleTimeString();
      const icon = this.getIconForType(log.type);
      summary += `${index + 1}. [${time}] ${icon} ${log.content}\n`;
    });

    summary += `\n${'='.repeat(60)}\n`;
    summary += `Total entries: ${sessionLogs.length}\n`;
    summary += `Session ID: ${this.sessionId}\n`;

    return summary;
  }

  public getIconForType(type: LogEntry['type']): string {
    const icons = {
      question: '❓',
      answer: '💬',
      code_change: '🔧',
      file_creation: '📝',
      file_edit: '✏️',
      deployment: '🚀',
      bug_fix: '🐛'
    };
    return icons[type] || '📌';
  }

  clearLogs(): void {
    try {
      fs.writeFileSync(this.logFile, JSON.stringify({ logs: [] }, null, 2));
    } catch (error) {
      console.error('Error clearing development log:', error);
    }
  }
}

// Singleton instance
export const devLogger = new DevelopmentLogger();

// Utility functions for quick logging
export const logQ = (question: string) => devLogger.logQuestion(question);
export const logA = (answer: string) => devLogger.logAnswer(answer);
export const logChange = (file: string, description: string) => devLogger.logCodeChange(file, description);
export const logCreation = (file: string, purpose: string) => devLogger.logFileCreation(file, purpose);
export const logEdit = (file: string, change: string) => devLogger.logFileEdit(file, change);
export const logFix = (issue: string, solution: string) => devLogger.logBugFix(issue, solution);
export const logDeploy = (status: string, details?: string) => devLogger.logDeployment(status, details);
export const getLogs = (count?: number) => devLogger.getRecentLogs(count);
export const getSummary = () => devLogger.exportSessionSummary();

// Command line interface for accessing logs
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--recent') || args.includes('-r')) {
    const count = parseInt(args[args.indexOf('--recent') + 1] || args[args.indexOf('-r') + 1] || '10');
    console.log('\n📋 Recent Development Logs:');
    console.log('='.repeat(60));
    const logs = devLogger.getRecentLogs(count);
    logs.forEach((log, index) => {
      const time = new Date(log.timestamp).toLocaleString();
      const icon = devLogger.getIconForType(log.type);
      console.log(`${index + 1}. [${time}] ${icon} ${log.content}`);
    });
  }
  
  if (args.includes('--summary') || args.includes('-s')) {
    console.log(devLogger.exportSessionSummary());
  }
  
  if (args.includes('--clear')) {
    devLogger.clearLogs();
    console.log('✅ Development logs cleared.');
  }
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
📋 Development Logger - Usage:
  node development-logger.js [options]

Options:
  -r, --recent [n]    Show last n logs (default: 10)
  -s, --summary       Show current session summary
  --clear            Clear all logs
  -h, --help          Show this help message

Examples:
  node development-logger.js --recent 20
  node development-logger.js --summary
  node development-logger.js --clear
    `);
  }
}