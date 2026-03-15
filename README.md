
# Build requirement
```
npm install cloudflare@latest
```

# Start the app in local
```
npm run pages:dev
```
access http://localhost:8789/ for service

# Deploy to Cloudflare Pages
Keep all variables as secret type
```
> Deploy command:npx wrangler deploy --keep-vars
> Put Non-production branch deployment command as : npx wrangler versions upload
```
