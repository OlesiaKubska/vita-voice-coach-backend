/**
 * message controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::message.message', ({ strapi }) => ({
  async create(ctx) {
    const { data } = ctx.request.body || {};
    if (!data || !data.email || !data.message) {
      return ctx.badRequest('Missing required fields: email, message');
    }

    // 2) Get UA and IP
    const ua = ctx.request.headers['user-agent'] as string || '';
    const ip =
      String(ctx.request.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
      ctx.request.ip;

    // 3) Save to DB
    const entry = await strapi.entityService.create('api::message.message', {
      data: {
        ...data,
        ip,
        userAgent: ua,
        read: false,
      },
    });

    // send email
    try {
       const to = process.env.CONTACT_TO || process.env.EMAIL_DEFAULT_REPLY_TO; 
      await strapi.plugin('email').service('email').send({
        to,
        from: process.env.EMAIL_DEFAULT_FROM,
        replyTo: data.email,
        subject: `Nowa wiadomość z formularza: ${data.name || 'Bez imienia'}`,
        text: [
          `Imię: ${data.name || '-'}`,
          `Email: ${data.email}`,
          `IP: ${ip}`,
          `UA: ${ua}`,
          '',
          'Wiadomość:',
          (data.message || '').replace(/<\/?[^>]+(>|$)/g, ''),
        ].join('\n'),
        html: `
          <p><b>Imię:</b> ${escapeHtml(data.name || '')}</p>
          <p><b>Email:</b> ${escapeHtml(data.email)}</p>
          <p><b>IP:</b> ${escapeHtml(ip)}</p>
          <p><b>UA:</b> ${escapeHtml(ua)}</p>
          <hr/>
          <div style="white-space:pre-wrap">${escapeHtml(data.message || '')}</div>
        `,
      });
    } catch (error) {
      strapi.log.error('Error sending email:', error);
    }

    ctx.status = 201;
    return (ctx.body = { ok: true, id: entry.id });
  },

  async markAsRead(ctx) {
    const { id } = ctx.params;

    const exists = await strapi.entityService.findOne('api::message.message', id);
    if (!exists) {
      return ctx.notFound('Message not found');
    }

    const updated = await strapi.entityService.update('api::message.message', id, {
      data: { read: true },
    });

    return (ctx.body = { ok: true, data: updated });
  },
}));

function escapeHtml(str: string): string {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"']/g, (m) => {
    switch (m) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#039;';
      default: return m;
    }
  });
}
