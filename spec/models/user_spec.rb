# frozen_string_literal: true

require_relative '../rails_helper'

RSpec.describe 'spreadsheet/index' do
  describe 'index.html.erbのテスト' do
    it 'h1タグ内にUsersが表示されているかどうか' do
      visit 'spreadsheet#index'
      expect(page).to have_selector('h1', text: 'Users')
    end
  end
end
