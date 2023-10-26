# frozen_string_literal: true
require 'rails_helper'

def login(user)
  visit root_path
  expect(page).to have_selector('#login_button')

  click_on 'ログイン'

  expect(page).to have_selector('#email_form')

  fill_in 'email_form', with: user.email
  fill_in 'user_password', with: 'password'

  click_button 'ログイン'

  expect(page).to have_current_path(root_path)

end
