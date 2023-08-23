# frozen_string_literal: true
require 'rails_helper'
require_relative './helpers/login_helper'

RSpec.describe 'CSVファイルを読み込めること' do
  fixtures :users

  it '内容品が全て内容品設定フォームに入力した内容になっている事' do
    user = users(:bothUser)

    login(user)

    file_input = find('#fileInput', visible: false)
    file_path = Rails.root.join('spec', 'fixtures', 'orders_minne_sample.csv')
    attach_file(file_input[:name], file_path, make_visible: true)

    expect(page).to have_content('minneのデータが読み込まれました。')
      
    expect(page).to have_content("minne\n12345694")
    
    click_on 'いいえ'

    click_on 'クリックポスト変換'

    fill_in 'convertForm', with: '変換された内容品'

    click_on 'クリックポスト変換'

    expect(page).to have_content('変換された内容品')
    
  end
end
