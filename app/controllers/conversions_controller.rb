# frozen_string_literal: true

class ConversionsController < ApplicationController
  def index
    conversions = Conversion.where(user: current_user)
    result = {}
    conversions.each do |conversion|
      conversion.content
      result[conversion.item] = conversion.content
    end

    render json: result
  end
end
