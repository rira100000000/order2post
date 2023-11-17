# frozen_string_literal: true

class TopController < ApplicationController
  def index
    @current_user_email = current_user.email if current_user
  end
end
