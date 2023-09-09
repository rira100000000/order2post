# frozen_string_literal: true
require 'rails_helper'
require_relative './helpers/login_helper'
require 'csv'

RSpec.describe 'クリックポスト用に正しくファイルが作成できること' do
  fixtures :users

  it 'クリックポスト用に正しくファイルが作成できること' do
    user = users(:bothUser)
    login(user)
    download_path = Rails.root.join('spec', 'tmp')
    page.driver.browser.download_path = download_path
    expect(page).to have_content('ファイルを選択')
    
    file_path = Rails.root.join('spec', 'fixtures', 'orders_minne_sample.csv')
    find('input[type="file"]',visible: false).set(file_path.to_s)

    expect(page).to have_content('minneのデータが読み込まれました。')

    click_on 'いいえ'

    expect(page).to have_no_content('minneのデータが読み込まれました。')
      
    expect(page).to have_content("minne\n12345694")
    
    all('input[type="checkbox"]').each do |checkbox|
      checkbox.set(true)
    end
    
    click_on 'クリックポスト変換'

    fill_in 'convertForm', with: '変換された内容品'

    click_on 'クリックポスト変換'

    expect(page).to have_content('変換された内容品')

    click_on 'ダウンロード'

    # Shift_JISエンコーディングでCSVファイルを読み込む
    download_file_path = "#{download_path}/clickpost.csv"

    count = 0
    while !File.exist?(download_file_path)
      sleep 1
      count++
      raise(Encoding::UndefinedConversionError, 'DOWNLOAD IS FAILED') if count > 10
    end

    clickpost_data = CSV.read(download_file_path, encoding: 'Shift_JIS', headers: true)
    clickpost_sample_data = CSV.read("#{Rails.root.join('spec', 'fixtures','clickpost_sample.csv')}", encoding: 'Shift_JIS', headers: true)
    expect(clickpost_data).to match_array(clickpost_sample_data)

  end
end
