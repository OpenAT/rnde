# -*- coding: utf-8 -*-

{
    'name': 'rnde_config',
    'summary': '''FS-Online rnde instance configuration''',
    'description': '''
FS-Online Instance Configuration
================================

Customer configuration for the instance rnde

- Default settings
- View modifications
- CSS
- Translations
    ''',
    'author': 'Michael Karrer (michael.karrer@datadialog.net), DataDialog',
    'version': '1.0',
    'website': 'https://www.datadialog.net',
    'installable': True,
    'depends': [
        'sale',
        'portal_sale',
        'website',
        'website_sale_donate',
    ],
    'data': [
        'views/templates.xml',
        'views/snippet_options.xml',
    ],
}