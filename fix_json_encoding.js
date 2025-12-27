const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const backendPath = path.resolve('../edu-chatpilot-backend');
const filesToFix = ['package.json', 'tsconfig.json'];

if (!fs.existsSync(backendPath)) {
    console.error(`Backend directory not found at: ${backendPath}`);
    process.exit(1);
}

filesToFix.forEach(file => {
    const filePath = path.join(backendPath, file);
    if (fs.existsSync(filePath)) {
        console.log(`Checking ${file}...`);
        const content = fs.readFileSync(filePath);

        // Check for UTF-8 BOM (EF BB BF)
        if (content[0] === 0xEF && content[1] === 0xBB && content[2] === 0xBF) {
            console.log(`Found BOM in ${file}. Removing...`);
            const cleanContent = content.subarray(3);
            fs.writeFileSync(filePath, cleanContent);
            console.log(`Fixed ${file}.`);
        } else {
            console.log(`${file} is clean.`);
        }
    }
});

// Git operations
try {
    process.chdir(backendPath);
    console.log('Pushing fix directly from Node.js...');
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Fix: Remove BOM characters from JSON files"', { stdio: 'inherit' });
    execSync('git push', { stdio: 'inherit' });
    console.log('Pushed encoding fix.');
} catch (error) {
    console.log('Git commands failed (maybe nothing to commit?):', error.message);
}
