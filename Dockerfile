# lightweight static server using lighttpd to serve zapp-components/dist
FROM alpine:3.20

# Install lighttpd
RUN apk add --no-cache lighttpd

# Create runtime dirs
RUN mkdir -p /var/log/lighttpd /run/lighttpd /var/www/localhost/htdocs

# Copy build artifacts into the document root
# Ensure your build context contains zapp-components/dist
COPY zapp-components/dist/ /var/www/localhost/htdocs/
COPY zapp-iframe/build/ /var/www/localhost/htdocs/zapp-iframe

# Set sane permissions
RUN chown -R lighttpd:lighttpd /var/www/localhost/htdocs /var/log/lighttpd /run/lighttpd

# Minimal lighttpd config: serve from /var/www/localhost/htdocs and log to stdout/stderr
RUN printf '%s\n' \
    'server.document-root = "/var/www/localhost/htdocs"' \
    'server.port = 80' \
    'server.username = "lighttpd"' \
    'server.groupname = "lighttpd"' \
    'server.modules = (' \
    '  "mod_indexfile",' \
    '  "mod_access",' \
    '  "mod_alias",' \
    '  "mod_accesslog"' \
    ')' \
    'server.modules += ( "mod_setenv" )' \
    'setenv.add-response-header = (' \
    '  "Access-Control-Allow-Origin" => "*",' \
    '  "Access-Control-Allow-Credentials" => "true"' \
    ')' \
    '$HTTP["request-method"] == "OPTIONS" {' \
    '  setenv.add-response-header = (' \
    '    "Access-Control-Allow-Methods" => "GET, HEAD, OPTIONS",' \
    '    "Access-Control-Allow-Headers" => "Origin, X-Requested-With, Content-Type, Accept, Authorization",' \
    '    "Content-Security-Policy" => "frame-ancestors self https://*.zeus.gent https://zeus.gent",' \
    '    "X-Frame-Options" => "ALLOW-FROM https://*.zeus.gent",' \
    '    "Access-Control-Max-Age" => "86400"' \
    '  )' \
    '}' \
    'index-file.names = ( "index.html", "index.htm" )' \
    'accesslog.filename = "/dev/stdout"' \
    'server.errorlog = "/dev/stderr"' \
    'include "mime-types.conf"' \
    > /etc/lighttpd/lighttpd.conf

EXPOSE 80

# Run in foreground
CMD ["lighttpd", "-D", "-f", "/etc/lighttpd/lighttpd.conf"]