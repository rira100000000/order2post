# frozen_string_literal: true
require 'rails_helper'

def login(user)
  visit root_path
  expect(page).to have_selector('#login_button')

  click_on 'login_button'

  expect(page).to have_selector('#email_form')

  fill_in 'email_form', with: user.email
  fill_in 'user_password', with: 'password'

  click_button 'Log in'

  expect(page).to have_current_path(root_path)

end
