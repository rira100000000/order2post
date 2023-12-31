# frozen_string_literal: true

class ConversionsController < ApplicationController
  protect_from_forgery

  def index
    conversions = Conversion.content_per_item(current_user)
    render json: conversions
  end

  def create
    new_conversions = params[:conversions]
    current_conversions = current_user.conversions

    new_conversions.each_key do |key|
      is_update = false
      current_conversions.each do |current_conversion|
        next if current_conversion.item != key

        update(current_conversion, new_conversions[key])
        is_update = true
        break
      end
      submit(key, new_conversions[key]) unless is_update
    end

    render json: params[:data]
  end

  private

  def submit(key, content)
    new_conversion = current_user.conversions.create!(item: key, content:)
    new_conversion.save!
  end

  def update(conversion, content)
    new_conversion_params = { content: }
    conversion.update!(new_conversion_params)
  end
end
