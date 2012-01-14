Todo::Application.routes.draw do
  resources :todos do
    collection do
      get :assets
      post :list
    end
  end

  root :to => 'todos#index'
end
