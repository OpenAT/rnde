# -*- coding: utf-'8' "-*-"
from openerp import models, fields


class CrmLeadRNDE(models.Model):
    _name = "crm.lead"
    _inherit = "crm.lead"

    rnde_anrede = fields.Char('Anrede')
    rnde_titel = fields.Char('Titel')

    rnde_vorname = fields.Char('Vorname')
    rnde_nachname = fields.Char('Nachname')

    rnde_firmenname = fields.Char('Firmenname')

    rnde_clownpartner_nr = fields.Char('Clownpartner Nummer')

    rnde_nachricht = fields.Text('Nachricht')

    rnde_newsletter = fields.Boolean('Newsletter')
