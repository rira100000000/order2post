# frozen_string_literal: true
require 'rails_helper'
require_relative '../helpers/login_helper'

RSpec.describe '変換する注文を選択できること' do
    fixtures :users
    fixtures :conversions
    fixtures :converteds

    it 'チェックした注文のみが変換されること' do
      user = users(:have_conversions_User)
      login(user)

      expect(page).to have_content('ファイルを選択')
      
      file_path = Rails.root.join('spec', 'fixtures', 'tradenavi-list_paid-utf-8_202302071509.csv')    
      find('input[type="file"]',visible: false).set(file_path.to_s)

      expect(page).to have_content('Creemaのデータが読み込まれました。')

      click_on 'いいえ'

      expect(page).to have_no_content('Creemaのデータが読み込まれました。')

      expect(page).to have_content("Creema\n202302071459-zxPE")
      
      find('#checkbox-2').click

      click_on 'クリックポスト変換'

      find('#allConvertMenu').click
      fill_in 'convertForm', with: '変換された内容品'

      click_on 'クリックポスト変換'
      expect(page).to have_selector('body', text: '変換された内容品', count: 1)
    end

    it '一度に41件以上変換しようとするとエラーになること' do
      user = users(:no_conversions_User)
      login(user)

      expect(page).to have_content('ファイルを選択')
      
      file_path = Rails.root.join('spec', 'fixtures', 'tradenavi-list_paid-utf-8_many_orders.csv')    
      find('input[type="file"]',visible: false).set(file_path.to_s)

      expect(page).to have_content('Creemaのデータが読み込まれました。')

      click_on 'いいえ'

      expect(page).to have_no_content('Creemaのデータが読み込まれました。')

      expect(page).to have_content("Creema\n202302071459-1234")

      click_on 'クリックポスト変換'
      accept_alert
      expect(page).to have_content("Creema\n202302071459-1234")
    end

    it '一度変換した注文を変換しようとすると警告が出ること' do
      user = users(:have_converteds_User)
      login(user)

      expect(page).to have_content('ファイルを選択')
      
      file_path = Rails.root.join('spec', 'fixtures', 'tradenavi-list_paid-utf-8_202302071509.csv')    
      find('input[type="file"]',visible: false).set(file_path.to_s)

      expect(page).to have_content('Creemaのデータが読み込まれました。')

      click_on 'いいえ'

      expect(page).to have_no_content('Creemaのデータが読み込まれました。')

      expect(page).to have_content("Creema\n202302071459-zxPE")
      
      find('#checkbox-0').click

      click_on 'クリックポスト変換'
      accept_alert
      expect(page).to have_content("クリックポスト変換設定")
    end
  end
