# frozen_string_literal: true

class ConversionsController < ApplicationController
  def index
    conversions = Conversion.all
    result = {}
    conversions.each { |conversion| result[conversion.item] = conversion.content }
    render json: result
  end
end
