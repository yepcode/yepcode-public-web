# YepCode Public Web

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve collections from `src/content/collection/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Docker deployment

### Docker compose file

```yml
version: "3.1"

services:
  app:
    image: nginx:alpine
    container_name: "yepcode-public-web"
    network_mode: bridge
    restart: always
    volumes:
      - "./volumes/usr/share/nginx/html:/usr/share/nginx/html"
      - "./volumes/etc/nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf"
    labels:
      - "traefik.enable=true"
      - "traefik.http.middlewares.yepcode-docs-api-redirect.redirectregex.regex=^https?://yepcode.io/docs/api/?(.*)"
      - "traefik.http.middlewares.yepcode-docs-api-redirect.redirectregex.replacement=https://cloud.yepcode.io/api/rest/public/swagger-ui/index.html"
      - "traefik.http.middlewares.yepcode-docs-api-redirect.redirectregex.permanent=true"
      - "traefik.http.routers.yepcode-docs-api-redirect.rule=Host(`yepcode.io`) && PathPrefix(`/docs/api`)"
      - "traefik.http.routers.yepcode-docs-api-redirect.entrypoints=http,https"
      - "traefik.http.routers.yepcode-docs-api-redirect.middlewares=yepcode-docs-api-redirect"
      - "traefik.http.routers.yepcode-docs-api-redirect.service=noop@internal"
      - "traefik.http.middlewares.yepcode-docs-redirectregex.redirectregex.regex=^https?://docs.yepcode.io/(.*)"
      - "traefik.http.middlewares.yepcode-docs-redirectregex.redirectregex.replacement=https://yepcode.io/docs/$${1}"
      - "traefik.http.middlewares.yepcode-docs-redirectregex.redirectregex.permanent=true"
      - "traefik.http.middlewares.yepcode-docs-customer-area.basicauth.users=test:$$apr1$$z2HERJZm$$DaVp83ZzjwCRdkK6IIV.O1"
      - "traefik.http.routers.yepcode-docs-legacy.entrypoints=http"
      - "traefik.http.routers.yepcode-docs-legacy.rule=Host(`docs.yepcode.io`)"
      - "traefik.http.routers.yepcode-docs-legacy.middlewares=yepcode-docs-redirectregex"
      - "traefik.http.routers.yepcode-docs-legacy_https.entrypoints=https"
      - "traefik.http.routers.yepcode-docs-legacy_https.rule=Host(`docs.yepcode.io`)"
      - "traefik.http.routers.yepcode-docs-legacy_https.middlewares=yepcode-docs-redirectregex"
      - "traefik.http.routers.yepcode.entrypoints=http"
      - "traefik.http.routers.yepcode.rule=Host(`yepcode.io`)"
      - "traefik.http.routers.yepcode.middlewares=redirect-http-to-https@file"
      - "traefik.http.routers.yepcode_https.entrypoints=https"
      - "traefik.http.routers.yepcode_https.rule=Host(`yepcode.io`)"
      - "traefik.http.routers.yepcode_https.middlewares=three-retry-attempts@file"
      - "traefik.http.routers.customer-area.rule=Host(`yepcode.io`) && PathPrefix(`/docs/customer-area`)"
      - "traefik.http.routers.customer-area.middlewares=yepcode-docs-customer-area"
```

### NGINX configuration

```nginx
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    # Enable Gzip compression
    gzip          on;

    # Compression level (1-9)
    gzip_comp_level     5;

    # Don't compress anything under 256 bytes
    gzip_min_length     256;

    # Compress output of these MIME-types
    gzip_types
        application/atom+xml
        application/javascript
        application/json
        application/rss+xml
        application/vnd.ms-fontobject
        application/x-font-ttf
        application/x-font-opentype
        application/x-font-truetype
        application/x-javascript
        application/x-web-app-manifest+json
        application/xhtml+xml
        application/xml
        font/eot
        font/opentype
        font/otf
        image/svg+xml
        image/x-icon
        image/vnd.microsoft.icon
        text/css
        text/plain
        text/javascript
        text/x-component;

    # Disable gzip for bad browsers
    gzip_disable  "MSIE [1-6]\.(?!.*SV1)";

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;

        location /docs/editor-config {
            location ~* \.(json)$ {
                add_header 'Cache-Control' 'public';
                add_header 'X-Frame-Options' 'ALLOW-FROM *';
                add_header 'Access-Control-Allow-Origin' '*';
                add_header 'Access-Control-Allow-Credentials' 'true';
                add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
                add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
                expires +6h;
             }
        }

        location /docs/snippets {
            location ~* \.(json)$ {
                add_header 'Cache-Control' 'public';
                add_header 'X-Frame-Options' 'ALLOW-FROM *';
                add_header 'Access-Control-Allow-Origin' '*';
                add_header 'Access-Control-Allow-Credentials' 'true';
                add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
                add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
                expires +6h;
             }
        }
    }

    error_page  404              /docs/404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```
