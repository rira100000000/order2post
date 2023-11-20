# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Conversion, type: :model do
  describe '#get_conversions' do
    it '変換ルールがハッシュで返ること' do
      user = User.new(email: 'test_user@example.com', password: 'password')
      conversion = Conversion.new(user:, item: 'スカート', content: '衣類')
      user.save!
      conversion.save!
  
      result = Conversion.get_conversions(user)
      expect(result['スカート']).to eq('衣類')
    end

    it '変換ルールがないとき、空のハッシュが返ること' do
      user = User.new(email: 'test_user@example.com', password: 'password')
      user.save!
        
      result = Conversion.get_conversions(user)

      expect(result).to be_a(Hash)
      expect(result).to be_empty
    end
  end
end
