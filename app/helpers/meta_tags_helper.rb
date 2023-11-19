# frozen_string_literal: true

module MetaTagsHelper
  def default_meta_tags
    {
      reverse: true,
      charset: 'utf-8',
      description: 'Order2Postはminne、Creemaの注文情報をクリックポストのまとめ申込ファイルに変換するサービスです',
      keywords: 'minne,Creema,クリックポスト,ハンドメイド,発送,CSV',
      viewport: 'width=device-width, initial-scale=1.0',
      og: {
        title: :title,
        type: 'website',
        site_name: 'Order2Post',
        description: :description,
        image: vite_asset_path('entrypoints/images/OGP.png'),
        url: 'https://order2post.fun'
      },
      twitter: {
        card: 'summary',
        site: '@rira100000000',
        description: :description,
        image: vite_asset_path('entrypoints/images/OGP.png'),
        domain: 'https://order2post.fun'
      }
    }
  end
end
