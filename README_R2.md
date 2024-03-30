Here is a quickstart guide for using Cloudflare R2:

## Create an R2 Bucket

1. Log into the Cloudflare dashboard and go to the R2 section.
2. Click "Create bucket" and enter a name for your new bucket.
3. Optionally, you can set a location hint to indicate where data will primarily be accessed from.[4]

## Upload Files to R2

1. In the R2 dashboard, select your bucket and click "Upload".
2. Drag and drop files into the upload area or select files from your computer.
3. You'll get a confirmation once the files are uploaded successfully.[4]

## Access R2 from Cloudflare Workers

1. Install Wrangler (the Cloudflare Workers CLI tool) in your project:

```bash
npm install wrangler --save-dev
```

2. Authenticate Wrangler:

```
wrangler login
```

3. Add an R2 bucket binding to wrangler.toml:

```toml
r2_buckets = ["YOUR_BUCKET_NAME"]
```

4. You can now interact with your R2 bucket from your Worker using the Fetch API and the R2 bucket binding.[1]

## Access R2 from Other Apps

Cloudflare provides an S3-compatible API that allows you to access R2 from existing S3 tools and libraries. You'll need to generate an API token with the required permissions from the Cloudflare dashboard to use as the access key.[7]

This covers the basics for getting started with Cloudflare R2 object storage. The documentation provides more details on advanced features like configuring CORS, bucket policies, migration tools, and pricing.[4][6][7] [1][4][6][7]

Citations:
[1] https://developers.cloudflare.com/workers/tutorials/upload-assets-with-r2/
[2] https://www.youtube.com/watch?v=2qq94qs1ZmM
[3] https://themedev.net/blog/how-to-offload-wp-media-to-cloudflare-r2/
[4] https://developers.cloudflare.com/r2/get-started/
[5] https://www.youtube.com/watch?v=HPo2OW_bdi0
[6] https://developers.cloudflare.com/r2/
[7] https://www.cloudflare.com/developer-platform/r2/
[8] https://www.youtube.com/watch?v=Q6WTwZI9-Ko
