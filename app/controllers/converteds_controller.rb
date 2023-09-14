# frozen_string_literal: true

class ConvertedsController < ApplicationController
  protect_from_forgery

  def submit
    new_converted_ids = params[:converteds]
    current_converted_orders = Converted.where(user: current_user)
    warning_list = []
    new_converted_ids.each do |new_converted_id|
      is_update = false
      current_converted_orders.each do |current_converted_order|
        next if current_converted_order.order_id != new_converted_id

        warning_list.push(new_converted_id)
        is_update = true
        break
      end

      create(new_converted_id) unless is_update
    end

    render json: warning_list
  end

  private

  def create(order_id)
    new_converted_order = Converted.new(user: current_user, order_id:)
    new_converted_order.save!
  end
end
