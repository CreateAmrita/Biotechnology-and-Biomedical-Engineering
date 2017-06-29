function update_channels() {
        var tmp_holder = undefined;
        var m_alpha = undefined;
        var m_beta = undefined;
        var n_alpha = undefined;
        var n_beta = undefined;
        var p_alpha = undefined;
        var p_beta = undefined;
        var q_alpha = undefined;
        var q_beta = undefined;
        var n_alpha = undefined;
        var n_beta = undefined;
        console.log(V[0])

        if (this.malphaequation == 1) {
            m_alpha = this.mac * (this.V[0] * 1000 - this.math) / (1 - Math.exp((this.V[0] * 1000 - this.math) * this.mas));
        } else if (this.malphaequation == 2) {
            m_alpha = this.mac / (1 + Math.exp((this.V[0] * 1000 - this.math) * this.mas));
        } else if (this.malphaequation == 3) {
            m_alpha = this.mac * Math.exp((this.V[0] * 1000 - this.math) * this.mas);
        }
        console.log(mbetaequation)
        //console.log(this.mbc,this.mbs,this.mbth)
        if (this.mbetaequation == 1) {
            m_beta = this.mbc * (this.V[0] * 1000 - this.mbth) / (1 - Math.exp((this.V[0] * 1000 - this.mbth) * this.mbs));
        } else if (this.mbetaequation == 2) {
            m_beta = this.mbc / (1 + Math.exp((this.V[0] * 1000 - this.mbth) * this.mbs));
        } else if (this.mbetaequation == 3) {
            m_beta = this.mbc * Math.exp((this.V[0] * 1000 - this.mbth) * this.mbs);
        }

        console.log(m_alpha, m_beta)
        if (this.nalphaequation == 1) {
            n_alpha = this.hac * (this.V[0] * 1000 - this.hath) / (1 - Math.exp((this.V[0] * 1000 - this.hath) * this.has));
        } else if (this.nalphaequation == 2) {
            n_alpha = this.hac / (1 + Math.exp((this.V[0] * 1000 - this.hath) * this.has));
        } else if (this.nalphaequation == 3) {
            n_alpha = this.hac * Math.exp((this.V[0] * 1000 - this.hath) * this.has);
        }
        if (this.hbetaequation == 1) {
            n_beta = this.hbc * (this.V[0] * 1000 - this.hbth) / (1 - Math.exp((this.V[0] * 1000 - this.hbth) * this.hbs));
        } else if (this.hbetaequation == 2) {
            n_beta = this.hbc / (1 + Math.exp((this.V[0] * 1000 - this.hbth) * this.hbs));
        } else if (this.hbetaequation == 3) {
            n_beta = this.hbc * Math.exp((this.V[0] * 1000 - this.hbth) * this.hbs);
        }
        if (this.palphaequation == 1) {
            p_alpha = this.pac * (this.V[0] * 1000 - this.path) / (1 - Math.exp((this.V[0] * 1000 - this.path) * this.pas));
        } else if (this.palphaequation == 2) {
            p_alpha = this.pac / (1 + Math.exp((this.V[0] * 1000 - this.path) * this.pas));
        } else if (this.palphaequation == 3) {
            p_alpha = this.pac * Math.exp((this.V[0] * 1000 - this.path) * this.pas);
        }
        if (this.pbetaequation == 1) {
            p_beta = this.pbc * (this.V[0] * 1000 - this.pbth) / (1 - Math.exp((this.V[0] * 1000 - this.pbth) * this.pbs));
        } else if (this.pbetaequation == 2) {
            p_beta = this.pbc / (1 + Math.exp((this.V[0] * 1000 - this.pbth) * this.pbs));
        } else if (this.pbetaequation == 3) {
            p_beta = this.pbc * Math.exp((this.V[0] * 1000 - this.pbth) * this.pbs);
        }
        if (this.qalphaequation == 1) {
            q_alpha = this.qac * (this.V[0] * 1000 - this.qath) / (1 - Math.exp((this.V[0] * 1000 - this.qath) * this.qas));
        } else if (this.qalphaequation == 2) {
            q_alpha = this.qac / (1 + Math.exp((this.V[0] * 1000 - this.qath) * this.qas));
        } else if (this.qalphaequation == 3) {
            q_alpha = this.qac * Math.exp((this.V[0] * 1000 - this.qath) * this.qas);
        }
        if (this.qbetaequation == 1) {
            q_beta = this.qbc * (this.V[0] * 1000 - this.qbth) / (1 - Math.exp((this.V[0] * 1000 - this.qbth) * this.qbs));
        } else if (this.qbetaequation == 2) {
            q_beta = this.qbc / (1 + Math.exp((this.V[0] * 1000 - this.qbth) * this.qbs));
        } else if (this.qbetaequation == 3) {
            q_beta = this.qbc * Math.exp((this.V[0] * 1000 - this.qbth) * this.qbs);
        }
        if (this.nalphaequation == 1) {
            n_alpha = this.nac * (this.V[0] * 1000 - this.nath) / (1 - Math.exp((this.V[0] * 1000 - this.nath) * this.nas));
        } else if (this.nalphaequation == 2) {
            n_alpha = this.nac / (1 + Math.exp((this.V[0] * 1000 - this.nath) * this.nas));
        } else if (this.nalphaequation == 3) {
            n_alpha = this.nac * Math.exp((this.V[0] * 1000 - this.nath) * this.nas);
        }
        if (this.nbetaequation == 1) {
            n_beta = this.nbc * (this.V[0] * 1000 - this.nbth) / (1 - Math.exp((this.V[0] * 1000 - this.nbth) * this.nbs));
        } else if (this.nbetaequation == 2) {
            n_beta = this.nbc / (1 + Math.exp((this.V[0] * 1000 - this.nbth) * this.nbs));
        } else if (this.nbetaequation == 3) {
            n_beta = this.nbc * Math.exp((this.V[0] * 1000 - this.nbth) * this.nbs);
        }

        var M = m_alpha - (m_alpha + m_beta) * this.m[0];
        tmp_holder = this.max(0, this.m[0] + M * this.dt * 1000);
        this.m[0] = this.min(1, tmp_holder);
        var _loc3_ = n_alpha - (n_alpha + n_beta) * this.h[0];
        tmp_holder = this.max(0, this.h[0] + _loc3_ * this.dt * 1000);
        this.h[0] = this.min(1, tmp_holder);
        var _loc4_ = p_alpha - (p_alpha + p_beta) * this.p[0];
        tmp_holder = this.max(0, this.p[0] + _loc4_ * this.dt * 1000);
        this.p[0] = this.min(1, tmp_holder);
        var _loc5_ = q_alpha - (q_alpha + q_beta) * this.q[0];
        tmp_holder = this.max(0, this.q[0] + _loc5_ * this.dt * 1000);
        this.q[0] = this.min(1, tmp_holder);
        var _loc6_ = n_alpha - (n_alpha + n_beta) * this.n[0];
        tmp_holder = this.max(0, this.n[0] + _loc6_ * this.dt * 1000);
        this.n[0] = this.min(1, tmp_holder);

        console.log(m[0], n[0], h[0], p[0], q[0])

    }