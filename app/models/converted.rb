# frozen_string_literal: true

class Converted < ApplicationRecord
  belongs_to :user

  validates :order_id, presence: true
end
