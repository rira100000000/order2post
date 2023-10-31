# frozen_string_literal: true
require 'rails_helper'
require_relative './helpers/login_helper'

RSpec.describe 'CSVファイルを読み込めること' do
  fixtures :users
  
  it 'minneのCSVファイルが読み込めること' do
    user = users(:minneUser)

    login(user)

    expect(page).to have_content('ファイルを選択')
    
    file_path = Rails.root.join('spec', 'fixtures', 'orders_minne_sample.csv')    
    find('input[type="file"]',visible: false).set(file_path.to_s)

    expect(page).to have_content('minneのデータが読み込まれました。')

    click_on 'いいえ'

    expect(page).to have_no_content('minneのデータが読み込まれました。')
  end

  it 'creemaのCSVファイルが読み込めること' do
    user = users(:no_conversions_User)

    login(user)

    expect(page).to have_content('ファイルを選択')

    file_path = Rails.root.join('spec', 'fixtures', 'tradenavi-list_paid-utf-8_202302071509.csv')    
    find('input[type="file"]',visible: false).set(file_path.to_s)

    expect(page).to have_content('Creemaのデータが読み込まれました。')

    click_on 'いいえ'

    expect(page).to have_no_content('Creemaのデータが読み込まれました。')
  end

  it 'minneのCSVファイルを読込後、CreemaのCSVファイルを読み込めること' do
    user = users(:have_conversions_User)

    login(user)

    expect(page).to have_content('ファイルを選択')
    
    file_path = Rails.root.join('spec', 'fixtures', 'orders_minne_sample.csv')
    find('input[type="file"]',visible: false).set(file_path.to_s)
    expect(page).to have_content('minneのデータが読み込まれました。')

    file_path = Rails.root.join('spec', 'fixtures', 'tradenavi-list_paid-utf-8_202302071509.csv')
    all('input[type="file"]',visible: false)[1].set(file_path.to_s)
  
    expect(page).to have_content("minne\n12345694")
    expect(page).to have_content("Creema\n202302071459-zxPE")
    
  end

  it 'CreemaのCSVファイルを読込後、minneのCSVファイルを読み込めること' do    
    user = users(:have_conversions_User)

    login(user)
    
    expect(page).to have_content('ファイルを選択')

    file_path = Rails.root.join('spec', 'fixtures', 'tradenavi-list_paid-utf-8_202302071509.csv')    
    find('input[type="file"]',visible: false).set(file_path.to_s)
    expect(page).to have_content('Creemaのデータが読み込まれました。')

    file_path = Rails.root.join('spec', 'fixtures', 'orders_minne_sample.csv')
    all('input[type="file"]',visible: false)[1].set(file_path.to_s)
  
    expect(page).to have_content("Creema\n202302071459-zxPE")
    expect(page).to have_content("minne\n12345694")
    
  end

  it '最初からやり直すボタン押下後、新しいCSVファイルが読み込めること' do
    user = users(:have_conversions_User)

    login(user)

    file_path = Rails.root.join('spec', 'fixtures', 'tradenavi-list_paid-utf-8_202302071509.csv')    
    find('input[type="file"]',visible: false).set(file_path.to_s)

    expect(page).to have_content('Creemaのデータが読み込まれました。')

    click_on 'いいえ'

    file_path = Rails.root.join('spec', 'fixtures', 'orders_minne_sample.csv')
    find('input[type="file"]',visible: false).set(file_path.to_s)

    click_on 'いいえ'
    expect(page).to have_no_content("Creema\n202302071459-zxPE")
    expect(page).to have_content("minne\n12345694")
  end
end

RSpec.describe '注文一覧画面に戻ったとき、正常に表示されること' do
  fixtures :users
  
  it '注文一覧画面に戻ったあと、一覧とボタンが正常に表示されること' do
    user = users(:minneUser)

    login(user)

    expect(page).to have_content('ファイルを選択')
    
    file_path = Rails.root.join('spec', 'fixtures', 'orders_minne_sample.csv')    
    find('input[type="file"]',visible: false).set(file_path.to_s)

    expect(page).to have_content('minneのデータが読み込まれました。')

    click_on 'いいえ'

    expect(page).to have_content("minne\n12345694")

    click_on 'クリックポスト変換'
    expect(page).to have_no_content("minne\n12345694")

    click_on '注文一覧に戻る'

    expect(page).to have_content("minne\n12345694")

    expect(page).to have_content("最初からやり直す")
  end
end
