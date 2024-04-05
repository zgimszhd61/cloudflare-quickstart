export interface Env {
	MY_BUCKET: R2Bucket; // 添加对R2存储桶的引用
  }
  
  export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
	  const url = new URL(request.url);
	  const path = url.pathname;
  
	  // 根据请求的路径选择不同的操作
	  switch (path) {
		case '/upload':
		  return handleUpload(request, env);
		case '/download':
		  return handleDownload(request, env);
		default:
		  return new Response('Hello World!');
	  }
	},
  };
  
  // 处理文件上传
  async function handleUpload(request: Request, env: Env): Promise<Response> {
	const formData = await request.formData();
	const file = formData.get('file');
	if (file && file instanceof File) {
	  await env.MY_BUCKET.put(file.name, file.stream());
	  return new Response('File uploaded successfully');
	} else {
	  return new Response('Invalid file', { status: 400 });
	}
  }
  
  // 处理文件下载
  async function handleDownload(request: Request, env: Env): Promise<Response> {
	const url = new URL(request.url);
	const filename = url.searchParams.get('filename');
	if (!filename) {
	  return new Response('Filename is required', { status: 400 });
	}
  
	const object = await env.MY_BUCKET.get(filename);
	if (object === null) {
	  return new Response('File not found', { status: 404 });
	}
  
	// 返回R2存储桶中的对象内容
	return new Response(object.body);
  }
  