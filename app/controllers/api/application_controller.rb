class Api::ApplicationController < ApplicationController
  include Concerns::AuthHelper
  helper_method :current_user
  respond_to :json
end