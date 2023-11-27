# frozen_string_literal: true

class ConvertedsController < ApplicationController
  protect_from_forgery

  def index
    converteds = Converted.where(user: current_user)
    render json: converteds
  end

  def create
    new_converted_ids = params[:converteds]
    current_converted_orders = current_user.converteds
    warning_list = []
    new_converted_ids.each do |new_converted_id|
      is_update = false
      current_converted_orders.each do |current_converted_order|
        next if current_converted_order.order_id != new_converted_id

        warning_list.push(new_converted_id)
        is_update = true
        break
      end

      submit(new_converted_id) unless is_update
    end

    render json: warning_list
  end

  private

  def submit(order_id)
    current_user.converteds.create!(order_id:)
  end
end
