# frozen_string_literal: true
require 'rails_helper'
require_relative './helpers/login_helper'

RSpec.describe 'CSVファイルを読み込めること' do
  fixtures :users
  
  it 'minneのCSVファイルが読み込めること' do
    user = users(:minneUser)

    login(user)

    # ファイル入力要素を特定
    file_input = find('#fileInput', visible: false)

    # ファイルモックをアップロード
    file_path = Rails.root.join('spec', 'fixtures', 'orders_minne_sample.csv')
    attach_file(file_input[:name], file_path, make_visible: true)

    expect(page).to have_content('minneのデータが読み込まれました。')

    click_on 'いいえ'

    expect(page).to have_no_content('Creemaのデータが読み込まれました。')

  end

  it 'creemaのCSVファイルが読み込めること' do
    user = users(:creemaUser)

    login(user)

    # ファイル入力要素を特定
    file_input = find('#fileInput', visible: false)

    # ファイルモックをアップロード
    file_path = Rails.root.join('spec', 'fixtures', 'tradenavi-list_paid-utf-8_202302071509.csv')
    attach_file(file_input[:name], file_path, make_visible: true)

    expect(page).to have_content('Creemaのデータが読み込まれました。')

    click_on 'いいえ'

    expect(page).to have_no_content('Creemaのデータが読み込まれました。')


  end

  it 'minneのCSVファイルを読込後、CreemaのCSVファイルを読み込めること' do
    user = users(:bothUser)

    login(user)

    file_input = find('#fileInput', visible: false)
    file_path = Rails.root.join('spec', 'fixtures', 'orders_minne_sample.csv')
    attach_file(file_input[:name], file_path, make_visible: true)

    expect(page).to have_content('minneのデータが読み込まれました。')
    
    continue_file_input = find('#continueInput', visible: false)
    file_path = Rails.root.join('spec', 'fixtures', 'tradenavi-list_paid-utf-8_202302071509.csv')
    attach_file(continue_file_input[:name], file_path, make_visible: true)
  
    expect(page).to have_content("minne\n12345694")
    expect(page).to have_content("Creema\n202302071459-zxPE")
    
  end

  it 'CreemaのCSVファイルを読込後、minneのCSVファイルを読み込めること' do
    user = users(:bothUser)

    login(user)

    file_input = find('#fileInput', visible: false)
    file_path = Rails.root.join('spec', 'fixtures', 'tradenavi-list_paid-utf-8_202302071509.csv')
    attach_file(file_input[:name], file_path, make_visible: true)

    expect(page).to have_content('Creemaのデータが読み込まれました。')

    continue_file_input = find('#continueInput', visible: false)
    file_path = Rails.root.join('spec', 'fixtures', 'orders_minne_sample.csv')
    attach_file(continue_file_input[:name], file_path, make_visible: true)
  
    expect(page).to have_content("Creema\n202302071459-zxPE")
    expect(page).to have_content("minne\n12345694")
    
  end

  it '最初からやり直すボタン押下後、新しいCSVファイルが読み込めること' do
    user = users(:bothUser)

    login(user)

    file_input = find('#fileInput', visible: false)
    file_path = Rails.root.join('spec', 'fixtures', 'tradenavi-list_paid-utf-8_202302071509.csv')
    attach_file(file_input[:name], file_path, make_visible: true)

    expect(page).to have_content('Creemaのデータが読み込まれました。')

    click_on 'いいえ'

    restart_file_input = find('#fileInput', visible: false)
    file_path = Rails.root.join('spec', 'fixtures', 'orders_minne_sample.csv')
    attach_file(restart_file_input[:name], file_path, make_visible: true)

    click_on 'いいえ'
    expect(page).to have_no_content("Creema\n202302071459-zxPE")
    expect(page).to have_content("minne\n12345694")
    
  end

  it '最初からやり直すボタン押下後、同じCSVファイルと追加のCSVファイルを読み込めること' do
    user = users(:bothUser)

    login(user)

    file_input = find('#fileInput', visible: false)
    file_path = Rails.root.join('spec', 'fixtures', 'tradenavi-list_paid-utf-8_202302071509.csv')
    attach_file(file_input[:name], file_path, make_visible: true)

    expect(page).to have_content('Creemaのデータが読み込まれました。')

    click_on 'いいえ'

    restart_file_input = find('#fileInput', visible: false)
    file_path = Rails.root.join('spec', 'fixtures', 'tradenavi-list_paid-utf-8_202302071509.csv')
    attach_file(restart_file_input[:name], file_path, make_visible: true)

    page.save_screenshot 'hoge.png'
    
    expect(page).to have_content('Creemaのデータが読み込まれました。')

    continue_file_input = find('#continueInput', visible: false)
    file_path = Rails.root.join('spec', 'fixtures', 'orders_minne_sample.csv')
    attach_file(continue_file_input[:name], file_path, make_visible: true)
    
    expect(page).to have_content("Creema\n202302071459-zxPE")
    expect(page).to have_content("minne\n12345694")    
  end


end
