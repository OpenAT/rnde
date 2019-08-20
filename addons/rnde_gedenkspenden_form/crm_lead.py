# -*- coding: utf-'8' "-*-"
from openerp import models, fields


class CrmLeadRNDE(models.Model):
    _name = "crm.lead"
    _inherit = "crm.lead"

    rnde_verstorbener = fields.Char('Verstorbene/r')
    rnde_verwandschaftsgrad = fields.Char('Verwandschaftsgrad')

    rnde_termin_trauerfeier = fields.Char('Termin der Trauerfeier')
    rnde_spendenstichwort = fields.Char('Spendenstichwort')
