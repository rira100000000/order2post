# frozen_string_literal: true

class ConversionsController < ApplicationController
  protect_from_forgery

  def index
    conversions = Conversion.get_conversions(current_user)
    render json: conversions
  end

  def submit
    new_conversions = params[:conversions]
    current_conversions = Conversion.where(user: current_user)

    new_conversions.each_key do |key|
      is_update = false
      current_conversions.each do |current_conversion|
        next if current_conversion.item != key

        update(current_conversion, new_conversions[key])
        is_update = true
        break
      end
      unless is_update
        puts "create #{key}★★★★★★★★★★★★★★★★★★★★★★"
        create(key, new_conversions[key])
      end
    end

    render json: params[:data]
  end

  private

  def create(key, content)
    new_conversion = Conversion.new(user: current_user, item: key, content:)
    new_conversion.save!
  end

  def update(conversion, content)
    new_conversion_params = { content: }
    conversion.update!(new_conversion_params)
  end

  def conversion_params
    # requireを削除
    params.permit(:conversions)
  end
end
