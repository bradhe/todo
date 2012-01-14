Todo::Application.routes.draw do
  resources :todos do
    collection do
      get :assets
    end
  end

  root :to => 'todos#index'
end
