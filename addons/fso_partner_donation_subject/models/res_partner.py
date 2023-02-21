# -*- coding: utf-8 -*-

from openerp import api, fields, models

import logging
logger = logging.getLogger(__name__)


class ResPartnerDonationSubject(models.Model):
    _inherit = 'res.partner'


    donation_subject = fields.Selection(string='Donation subject',
                                        selection=[('wo_hilfe_am_meisten_gebraucht_wird', 'Wo Hilfe am meisten gebraucht wird'),
                                                   ('kinder', 'Kinder'),
                                                   ('senioren', 'Senioren'),
                                                   ('gefluechtete', 'Geflüchtete'),
                                                   ('emergency_smile_suslandsprojekte', 'Emergency Smile/Auslandsprojekte')],
                                        default='')

    def create_donation_subject_mail_message(self, partner, values):
        line = values.get('donation_subject', False)

        if line:
            message_body = (line if line else "") + "\n" + \
                           '---\n' +\
                           'Spendenthema'

            logger.debug("Found donation_subject field (\"%s\"). Creating mail.message"
                         % line)

            partner.sudo().with_context(mail_post_autofollow=False).message_post(
                body=message_body,
                type='comment',
                subtype='fso_partner_donation_subject.fson_donation_subject',
                content_subtype="plaintext")

    @api.model
    def create(self, values):
        partner = super(ResPartnerDonationSubject, self).create(values)
        self.create_donation_subject_mail_message(partner, values)
        return partner

    @api.multi
    def write(self, values):
        res = super(ResPartnerDonationSubject, self).write(values)

        for p in self:
            self.create_donation_subject_mail_message(p, values)

        return res
