# frozen_string_literal: true

class Conversion < ApplicationRecord
  belongs_to :user

  validates :item, presence: true, uniqueness: { scope: :user_id }
  validates :content, presence: true

  def self.get_conversions(current_user)
    conversions = current_user.conversions
    result = {}
    conversions.each do |conversion|
      result[conversion.item] = conversion.content
    end
    result
  end
end
