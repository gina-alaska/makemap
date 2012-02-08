require 'bundler/capistrano'

set :application, "makemap"
set :repository,  "git@github.com:gina-alaska/makemap.git"
set :deploy_to, "/www/#{application}"
set :rails_env, 'production'

ssh_options[:forward_agent] = true

set :scm, :git
set :branch, "master"
set :deploy_via, :remote_cache
set :git_enable_submodules, 1

set :use_sudo, false
set :user, "webdev"

role :app, "makemap.x.gina.alaska.edu"#, "force.gina.alaska.edu"
role :web, "makemap.x.gina.alaska.edu"#, "force.gina.alaska.edu"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
namespace :deploy do
  task :start do ; end
  task :stop do ; end
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
  end

  task :precompile_assets do
    run "cd #{release_path}; RAILS_ENV=production bundle exec rake assets:precompile"
  end

  task :create_tmp do
    run "cd #{release_path}; bundle exec rake tmp:create"
  end

  task :copy_db_yml do
    run "cp #{release_path}/db/database.yml.example #{release_path}/db/database.yml"
  end
end
after('deploy:update_code', "deploy:copy_db_yml")
after('deploy:update_code', "deploy:precompile_assets")
after('deploy:update_code', "deploy:create_tmp")

