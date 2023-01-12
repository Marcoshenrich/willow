Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show] do
      resources :favorites, only: [:index]
    end
    resources :listings, only: [:create, :index, :show] do
      resources :reviews, only: [:index]
        collection do 
          get "/search/:query", to: "listings#search", :as => "search"
        end
    end
    resources :appointments, only: [:create, :destroy, :show, :index, :update]
    resources :favorites, only: [:create, :destroy, :index]
    resources :reviews, only: [:show, :create, :destroy, :update]
    resource :session, only: [:show, :create, :destroy]
    resource :map, only: [:show]

  end

  get '*path', to: "static_pages#frontend_index"
end
