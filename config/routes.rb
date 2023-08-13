Rails.application.routes.draw do
    namespace :api, defaults: { format: :json } do
        resources :users, only: [:create, :show, :update, :destroy]
        resource :session, only: [:show, :create, :destroy]
    end
end
