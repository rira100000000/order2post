# frozen_string_literal: true
require 'rails_helper'
require_relative './helpers/login_helper'

RSpec.describe '内容品の設定ができること' do
    fixtures :users
    fixtures :conversions

    it '内容品が全て内容品一括設定フォームに入力した内容になっている事' do
        user = users(:have_conversions_User)
        login(user)

        expect(page).to have_content('ファイルを選択')
        
        file_path = Rails.root.join('spec', 'fixtures', 'orders_minne_sample.csv')    
        find('input[type="file"]',visible: false).set(file_path.to_s)

        expect(page).to have_content('minneのデータが読み込まれました。')

        click_on 'いいえ'

        expect(page).to have_no_content('minneのデータが読み込まれました。')

        expect(page).to have_content("minne\n12345694")
        
        click_on 'クリックポスト変換'

        fill_in 'convertForm', with: '変換された内容品'

        click_on 'クリックポスト変換'

        expect(page).to have_content('変換された内容品')
    end

    it '内容品がDBに保存されている場合、内容品欄に自動入力されること' do
        user = users(:have_conversions_User)
        login(user)

        expect(page).to have_content('ファイルを選択')
        
        file_path = Rails.root.join('spec', 'fixtures', 'tradenavi-list_paid-utf-8_202302071509.csv')    
        find('input[type="file"]',visible: false).set(file_path.to_s)

        expect(page).to have_content('Creemaのデータが読み込まれました。')

        click_on 'いいえ'

        expect(page).to have_no_content('Creemaのデータが読み込まれました。')

        expect(page).to have_content("Creema\n202302071459-zxPE")
        
        click_on 'クリックポスト変換'

        expect(page).to have_xpath("//input[@id='content_0'][@value='スカート']")
        expect(page).to have_xpath("//input[@id='content_1'][@value='ラグランブラウス']")
        expect(page).to have_xpath("//input[@id='content_2'][@value='ブラウス']")
    end

    it '内容品がDBに保存されていない場合、内容品欄に何も入力されない事' do
        user = users(:no_conversions_User)
        login(user)

        expect(page).to have_content('ファイルを選択')
        
        file_path = Rails.root.join('spec', 'fixtures', 'tradenavi-list_paid-utf-8_202302071509.csv')    
        find('input[type="file"]',visible: false).set(file_path.to_s)

        expect(page).to have_content('Creemaのデータが読み込まれました。')

        click_on 'いいえ'

        expect(page).to have_no_content('Creemaのデータが読み込まれました。')

        expect(page).to have_content("Creema\n202302071459-zxPE")
        
        click_on 'クリックポスト変換'
        
        expect(page).to have_xpath("//input[@id='content_0'][@value='']")
    end

    it '内容品欄がすべて埋まっていれば、内容品の個別登録ができること' do
        user = users(:have_conversions_User)
        login(user)

        expect(page).to have_content('ファイルを選択')
        
        file_path = Rails.root.join('spec', 'fixtures', 'tradenavi-list_paid-utf-8_202302071509.csv')    
        find('input[type="file"]',visible: false).set(file_path.to_s)

        expect(page).to have_content('Creemaのデータが読み込まれました。')

        click_on 'いいえ'

        expect(page).to have_no_content('Creemaのデータが読み込まれました。')

        expect(page).to have_content("Creema\n202302071459-zxPE")
        
        all('input[type="checkbox"]').each do |checkbox|
            checkbox.set(true)
        end
        
        click_on 'クリックポスト変換'

        expect(page).to have_xpath("//input[@id='content_0'][@value='スカート']")
        expect(page).to have_xpath("//input[@id='content_1'][@value='ラグランブラウス']")
        expect(page).to have_xpath("//input[@id='content_2'][@value='ブラウス']")
        fill_in 'content_3', with: '衣類'
        sleep 5

        click_on '個別変換'

        expect(page).to have_content("ダウンロード")
        expect(page).to have_content("衣類")
    end

    it '内容品欄に空欄がある場合、内容品の個別登録ができない事' do
        user = users(:no_conversions_User)
        login(user)

        expect(page).to have_content('ファイルを選択')
        
        file_path = Rails.root.join('spec', 'fixtures', 'tradenavi-list_paid-utf-8_202302071509.csv')    
        find('input[type="file"]',visible: false).set(file_path.to_s)

        expect(page).to have_content('Creemaのデータが読み込まれました。')

        click_on 'いいえ'

        expect(page).to have_no_content('Creemaのデータが読み込まれました。')

        expect(page).to have_content("Creema\n202302071459-zxPE")
        
        click_on 'クリックポスト変換'

        expect(page).to have_xpath("//input[@id='content_0'][@value='']")

        click_on '個別変換'

        accept_alert
        expect(page).to have_content("内容品個別設定")
        expect(page).to have_no_content("ダウンロード")
    end
end
