# frozen_string_literal: true

class ConversionsController < ApplicationController
  def index
    conversions = Conversion.new.get_conversions(current_user)
    render json: conversions
  end
end
