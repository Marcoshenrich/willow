Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show] do
      resources :favorites, only: [:index]
    end
    resources :listings, only: [:create, :index, :show]
    resources :appointments, only: [:create, :destroy, :show, :index]
    resources :favorites, only: [:create, :destroy, :index]
    resources :reviews, only: [:index, :show, :create, :destroy, :update]
    resource :session, only: [:show, :create, :destroy]
    resource :map, only: [:show]

  end

  get '*path', to: "static_pages#frontend_index"
end
