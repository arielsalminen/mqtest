require "./lib/rack/cache_headers"

use Rack::Head
use Rack::Deflater
use Rack::CacheHeaders if ENV["RACK_ENV"] == "production"

use Rack::Static, 
  :urls => ["/img", "/js", "/css"],
  :root => "./"

run lambda { |env|
  [
    200, 
    {
      'Content-Type'  => 'text/html', 
      'Cache-Control' => 'public, max-age=3600' 
    },
    File.open('index.html', File::RDONLY)
  ]
}