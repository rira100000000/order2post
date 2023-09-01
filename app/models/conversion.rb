# frozen_string_literal: true

class Conversion < ApplicationRecord
  belongs_to :user

  validates :item, presence: true, uniqueness: true
  validates :content, presence: true
end
