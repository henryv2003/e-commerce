// Simple JavaScript wrapper for development logger
const fs = require('fs');
const path = require('path');

const logFile = path.join(process.cwd(), 'development_log.json');

function getRecentLogs(count = 10) {
  try {
    if (fs.existsSync(logFile)) {
      const data = JSON.parse(fs.readFileSync(logFile, 'utf8'));
      return data.logs.slice(-count).reverse();
    }
    return [];
  } catch (error) {
    console.error('Error reading logs:', error);
    return [];
  }
}

function getIconForType(type) {
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

function showRecentLogs(count = 10) {
  console.log('\n📋 Recent Development Logs:');
  console.log('='.repeat(60));
  const logs = getRecentLogs(count);
  
  if (logs.length === 0) {
    console.log('No logs found.');
    return;
  }
  
  logs.forEach((log, index) => {
    const time = new Date(log.timestamp).toLocaleString();
    const icon = getIconForType(log.type);
    console.log(`${index + 1}. [${time}] ${icon} ${log.content}`);
  });
  
  console.log('\n' + '='.repeat(60));
}

function showSummary() {
  try {
    if (!fs.existsSync(logFile)) {
      console.log('No log file found.');
      return;
    }
    
    const data = JSON.parse(fs.readFileSync(logFile, 'utf8'));
    const sessionLogs = data.logs.slice(-20); // Last 20 entries as "current session"
    
    if (sessionLogs.length === 0) {
      console.log('No session logs found.');
      return;
    }

    let summary = `\n📋 Development Session Summary - ${new Date().toLocaleString()}\n`;
    summary += `${'='.repeat(60)}\n\n`;

    sessionLogs.forEach((log, index) => {
      const time = new Date(log.timestamp).toLocaleTimeString();
      const icon = getIconForType(log.type);
      summary += `${index + 1}. [${time}] ${icon} ${log.content}\n`;
    });

    summary += `\n${'='.repeat(60)}\n`;
    summary += `Total entries: ${sessionLogs.length}\n`;

    console.log(summary);
  } catch (error) {
    console.error('Error generating summary:', error);
  }
}

function clearLogs() {
  try {
    fs.writeFileSync(logFile, JSON.stringify({ logs: [] }, null, 2));
    console.log('✅ Development logs cleared.');
  } catch (error) {
    console.error('Error clearing logs:', error);
  }
}

function showHelp() {
  console.log(`
📋 Development Logger - Usage:
  node dev-logger.js [options]

Options:
  -r, --recent [n]    Show last n logs (default: 10)
  -s, --summary       Show current session summary
  --clear            Clear all logs
  -h, --help          Show this help message

Examples:
  node dev-logger.js --recent 20
  node dev-logger.js --summary
  node dev-logger.js --clear
  `);
}

// Command line interface
const args = process.argv.slice(2);

if (args.includes('--recent') || args.includes('-r')) {
  const countIndex = args.indexOf('--recent') + 1 || args.indexOf('-r') + 1;
  const count = parseInt(args[countIndex] || '10');
  showRecentLogs(count);
} else if (args.includes('--summary') || args.includes('-s')) {
  showSummary();
} else if (args.includes('--clear')) {
  clearLogs();
} else if (args.includes('--help') || args.includes('-h')) {
  showHelp();
} else {
  showRecentLogs(10);
}