require 'sass/plugin'

Sass::Plugin.remove_template_location("./public/stylesheets/sass")
Sass::Plugin.options.merge!(
    :template_location => 'app/stylesheets',
    :css_location => 'tmp/stylesheets'
)

if ['test', 'development'].include? Rails.env
  Sass::Plugin.options[:always_update] = true
  Sass::Plugin.options[:line_comments] = true
end

Rails.configuration.middleware.delete('Sass::Plugin::Rack')
Rails.configuration.middleware.insert_before('Rack::Sendfile', 'Sass::Plugin::Rack')
Rails.configuration.middleware.insert_before('Rack::Sendfile', 'Rack::Static', :urls => ['/stylesheets'], :root => "#{Rails.root}/tmp")
