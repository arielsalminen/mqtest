require "rack"

module Rack
  class CacheHeaders
    def initialize(app)
      @app = app
    end

    def call(env)
      response = @app.call(env)
      uri = env["REQUEST_URI"]

      if uri =~ /\.(css|js|ico|png|jpe?g|gif)(\?[a-z]=\d*)?\z/i
        response[1]["Cache-Control"] = "public, max-age=31536000"
        response[1]["Expires"] = (Time.now + 31536000).utc.rfc2822
      end

      response
    end
  end
end