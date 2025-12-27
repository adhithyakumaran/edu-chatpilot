$ErrorActionPreference = "Stop"

$backendPath = "../edu-chatpilot-backend"
$targetFile = "$backendPath/src/services/firebase.ts"

if (-not (Test-Path $backendPath)) {
    Write-Error "Backend directory '$backendPath' not found."
    exit 1
}

$newContent = @"
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { ServiceAccount } from 'firebase-admin';

dotenv.config();

let serviceAccount: ServiceAccount | undefined;

try {
    // 1. Try FIREBASE_SERVICE_ACCOUNT (JSON String) - Best for Render/Vercel
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        console.log('🔥 Loading Firebase config from FIREBASE_SERVICE_ACCOUNT env var');
    } 
    // 2. Try Individual Variables
    else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
        serviceAccount = {
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        } as ServiceAccount;
        console.log('🔥 Loading Firebase config from individual env vars');
    }
} catch (e) {
    console.error('❌ Failed to parse Firebase credentials:', e);
}

if (!admin.apps.length) {
    if (serviceAccount) {
        try {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
            console.log('✅ Firebase Admin Initialized successfully');
        } catch (error) {
            console.error('❌ Firebase Admin Initialization failed:', error);
            // Don't exit process, let it fail on first DB call so we see logs
        }
    } else {
        console.error('❌ No valid Firebase credentials found in environment variables (FIREBASE_SERVICE_ACCOUNT or FIREBASE_PROJECT_ID/EMAIL/KEY).');
    }
}

export const db = admin.firestore();
export default admin;
"@

Set-Content -Path $targetFile -Value $newContent -Encoding UTF8
Write-Host "Updated firebase.ts"

# Git operations
Push-Location $backendPath
Write-Host "Pushing changes..."
git add src/services/firebase.ts
try {
    git commit -m "Fix: Improve Firebase auth with JSON env var support"
    git push
    Write-Host "Successfully pushed changes to backend repo."
} catch {
    Write-Warning "Git commit/push failed or nothing to commit. Check manually if needed."
    Write-Host $_
}
Pop-Location
